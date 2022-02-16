import firebase from '../config'
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {

    // Este objeto do firebase tem 2 metodos, o 'toFirestore' e o 'fromFirestore'.
    #conversor = {
        toFirestore(cliente: Cliente) { // O cliente é uma classe, e por padrão, não será convertida automaticamente pra JSON.
            return { // Converte a classe num plain object para ser interpretado e persistido no firestore.
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },

        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            // Esta recebendo dados do firebase e então retorna um objeto do tipo Cliente.
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        if(cliente?.id) {
            await this.colecao().doc(cliente.id).set(cliente)
            return cliente
        } else {
            const docRef = await this.colecao().add(cliente)
            const doc = await docRef.get()
            return doc.data() // Vai retornar o objeto, com id setado pelo firebase
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        return this.colecao().doc(cliente.id).delete()
    }

    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    private colecao() {
        return firebase
            .firestore().collection('clientes')
            .withConverter(this.#conversor)
    }
}
import Titulo from "./Titulo";

/* 
Aqui vc pode dizer quais propriedades vc espera receber nesse componente.
    'algumaCoisa?: coisa' torna as propriedades opcionais.
*/
interface LayoutProps {
    titulo: string
    children: any
}

export default function Layout(props: LayoutProps) {
    return (
        <div className={`
            flex flex-col w-2/3
            bg-white text-gray-800 rounded-md
        `}>
            <Titulo>{props.titulo}</Titulo>
            <div className="p-6">
                {props.children}
            </div>
        </div>
    )
}
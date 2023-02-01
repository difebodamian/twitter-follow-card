import { FollowCard } from "./FollowCard";
import './App.css';
import './index.css'
import { CardTitle } from "./CardTitle";
import { ShowMore } from "./ShowMore";

// siempre que se utilice una prop para inicializar un estado como 'initialIsFollowing', esta se va a inicializar una sola ver
// no se va a estar reinicializando

// el estado se inicializa solo una vez

/* cuando la prop inicia el estado de un componente, 
una buena práctica es agregarle a esar prop un 'initial' al inicio del nombre */ 
const users = [
    {
        name : 'Damián Nicolás Di Febo',
        userName : 'damiandifebo',
        initialIsFollowing : false
    },
    {
        name : 'Miguel Ángel Durán',
        userName : 'midudev',
        initialIsFollowing : true
    },
    {
        name : 'Sabrina Dellarossa',
        userName : 'sabridellarossa',
        initialIsFollowing : true
    },
    {
        name : 'Lionel Messi',
        userName : 'lionelmessi',
        initialIsFollowing : false
    },
    {
        name : 'Franco Pisso',
        userName : 'francopisso',
        initialIsFollowing : false
    },
    {
        name : 'Probando',
        userName : 'probando',
        initialIsFollowing : true
    }
]
export function App() {
    return (
        <div className="App">
            <CardTitle text={'A quién seguir'} />
            {
                users.map(({name, userName, initialIsFollowing}) => (
                    <FollowCard
                        key={userName}
                        name={name}
                        userName={userName}
                        initialIsFollowing={initialIsFollowing} 
                    />
                ))
            }
            <ShowMore />
        </div>
    )
}

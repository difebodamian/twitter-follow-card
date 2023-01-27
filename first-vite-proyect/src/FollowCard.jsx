import { useState } from 'react'

export function FollowCard ({name, userName, initialIsFollowing}) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing 
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button';

    const handleClick = () => {
        setIsFollowing(!isFollowing);
    }

    return(
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img 
                    className="tw-followCard-avatar"
                    alt={`El avatar de ${name}`}
                    src={`https://unavatar.io/${userName}`} />
                <div className="tw-followCard-info">
                    <strong>{name}</strong>
                    <span className="tw-followCard-infoUserName">{`@${userName}`}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick} >
                    <span className='tw-followCard-follow'>{text}</span>
                    <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>      
    )
}

// cuando isFollowing esté activado, que se vea el texto que diga 'siguiendo' y el span que diga 'dejar de seguir'
// no se vea con un display none.
// cuando se le hace un hover al botón, mientras que está en estado 'isFollowing' que el texto se elimine, y el span se haga visible

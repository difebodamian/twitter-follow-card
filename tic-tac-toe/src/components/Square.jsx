export const Square = ({ children, isSelected, index, updateBoard }) => {

  // hacemos un renderizado condicional determinando si el elemento está seleccionado o no para saber de quién es el turno
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () => {
    updateBoard(index);
  }
  return( 
    <div className={className}  onClick={handleClick}>
      {children}
    </div>
  )
}

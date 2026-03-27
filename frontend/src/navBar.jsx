const getTodaysDate = () => {
    const dateObj = new Date()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()

    const time = dateObj.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})

    return `${month}/${day}/${year} ${time}`
}

const NavBar = () => {
    return(
        <nav className="navBar">
            <img src="./titleIcon.png" alt="Feed" className="titleIcon" />
            <div>
                <p className="loadedAt">loaded at</p>
                <p className="todaysDate">{getTodaysDate()}</p>
            </div>
            
        </nav>
    )
}

export default NavBar
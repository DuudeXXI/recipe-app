import { NavLink } from "react-router-dom";
function Nav() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">Recipier</span>
                            <div className="collapse navbar-collapse">
                                <div className="navbar-nav">
                                    <NavLink to="/" end className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                                    <NavLink to="/recipies" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Recipies</NavLink>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Nav;

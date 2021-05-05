import Link from 'react-router-dom';
import authtocken from ''


let ProtectedRoute =({link,component})=>{
    if (!authtocken){
        return (       
            <Link to={link} component={component} />
        )
    }else{
        return (       
            <Link to='/login' component={Login} />
        )
    }   
}

export default ProtectedRoute;
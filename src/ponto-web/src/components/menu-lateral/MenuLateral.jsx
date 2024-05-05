import Dropdown from 'react-bootstrap/Dropdown';
import './MenuLateral.css';
import {useLocation, useNavigate} from "react-router-dom";

function MenuLateral() {
    const navigateTo = useNavigate()
    const location = useLocation();

    const handleNavigateTo = (path) => {
        const caminho = '/' + path;

        if (location.pathname !== caminho) {
            navigateTo(path);
        }
    };

    return (
        <Dropdown.Menu show>
            <Dropdown.Item eventKey="2" onClick={() => handleNavigateTo(`/`)}>Página inicial</Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => handleNavigateTo(`painel-colaborador`)}>Solicitações </Dropdown.Item>
            <Dropdown.Item eventKey="4">Cadastrar/Editar colaborador</Dropdown.Item>
            <Dropdown.Item eventKey="4">Perfil</Dropdown.Item>
        </Dropdown.Menu>
    );
}

export default MenuLateral;
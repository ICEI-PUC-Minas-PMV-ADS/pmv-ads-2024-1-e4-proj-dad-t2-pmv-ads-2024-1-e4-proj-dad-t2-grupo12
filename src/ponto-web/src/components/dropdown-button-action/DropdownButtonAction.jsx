import Dropdown from 'react-bootstrap/Dropdown';
import './DropdownButtonAction.css';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function DropdownButtonAction({ status }) {
    const navigateTo = useNavigate()

    const handleVisualizarRegistrosClick = () => {
        navigateTo(`registro-dia`);
    };

    const renderizarItensDropdown = (status) => {
        switch (status) {
            case "Solicitação":
                return (
                    <>
                        <Dropdown.Item onClick={handleVisualizarRegistrosClick} className="button-item">Visualizar registros do dia</Dropdown.Item>
                        <Dropdown.Item className="button-item">Visualizar solicitação</Dropdown.Item>
                    </>
                );
            case "Aprovado":
                return (
                    <>
                        <Dropdown.Item onClick={handleVisualizarRegistrosClick} className="button-item">Visualizar registros do dia</Dropdown.Item>
                    </>
                );
            case "Incompleto":
                return (
                    <>
                        <Dropdown.Item onClick={handleVisualizarRegistrosClick} className="button-item">Visualizar registros do dia</Dropdown.Item>
                        <Dropdown.Item className="button-item">Solicitar revisão</Dropdown.Item>
                    </>
                );
            default:
                return (
                    <>
                        <Dropdown.Item onClick={handleVisualizarRegistrosClick} className="button-item" >Visualizar registros do dia</Dropdown.Item>
                    </>
                );
        }
    };

    return (
        <Dropdown>
            <Dropdown.Toggle>
                Ação
            </Dropdown.Toggle>

            <Dropdown.Menu className="button-menu">
                {renderizarItensDropdown(status)}
            </Dropdown.Menu>
        </Dropdown>
    );
}

DropdownButtonAction.propTypes = {
    status: PropTypes.string.isRequired
};


export default DropdownButtonAction;
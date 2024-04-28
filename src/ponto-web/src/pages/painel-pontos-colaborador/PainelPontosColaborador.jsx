import './PainelPontosColaborador.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import PainelCentral from "../../components/painel-central/PainelCentral.jsx";
import {Button, InputGroup, Form, Image, Col} from "react-bootstrap";

const PainelPontosColaborador = () => {
    return (
        <div className="app">
            <header className="header">
                <div>
                    <img src="src/assets/logotransparente.png" alt="Logo" width="50" height="50"/>
                </div>
                <div className="barra-pesquisa">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Buscar colaborador"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Pesquisar
                        </Button>
                    </InputGroup>
                </div>
                <div className="usuario-logado">
                    <Col xs={6} md={4}>
                        <Image src="src/assets/perfil.png" roundedCircle
                               className="imagem-perfil"
                        />
                    </Col>
                </div>
                <div className="user-name-div">
                    <span className="user-name">Usuário logado</span>
                </div>

            </header>
            <div className="container">
                <div className="menu-lateral">
                    <MenuLateral></MenuLateral>
                </div>
                <div className="conteudo-central">
                    <div className="top-table">
                        <div className="title-top-table">
                            <h2>Ponto e solicitações colaborador</h2>
                        </div>
                        <div className="name-top-table">
                            <div className="setor-name">
                                <span>Setor:</span>
                                <span>Comercial</span>
                            </div>
                            <div className="vertical-line"></div>
                            <div className="employee-name">
                                <span>RAMON RIDWAN</span>
                                <span>Vendedor</span>
                            </div>
                        </div>
                    </div>
                    <div className="main-panel">
                        <div className="painel-table">
                        <PainelCentral></PainelCentral>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PainelPontosColaborador;
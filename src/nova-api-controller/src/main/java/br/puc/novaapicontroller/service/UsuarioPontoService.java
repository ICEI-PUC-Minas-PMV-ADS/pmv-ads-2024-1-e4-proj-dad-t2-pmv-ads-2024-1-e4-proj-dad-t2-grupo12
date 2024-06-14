package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.LoginClient;
import br.puc.novaapicontroller.client.UsuarioPontoClient;
import br.puc.novaapicontroller.dto.AlteracaoSenhaDto;
import br.puc.novaapicontroller.dto.CadastroUsuarioDto;
import br.puc.novaapicontroller.dto.EmailVerificacaoResponse;
import br.puc.novaapicontroller.dto.JwtPayload;
import br.puc.novaapicontroller.dto.usuario.AlteracaoSenhaRetorno;
import br.puc.novaapicontroller.dto.usuario.SetorDto;
import br.puc.novaapicontroller.dto.usuario.UsuarioDto;
import br.puc.novaapicontroller.util.JWTUtil;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioPontoService {

    private final UsuarioPontoClient usuarioClient;

    private final LoginClient loginClient;

    public List<UsuarioDto> obterListaUsarios() {
        return usuarioClient.obterListaUsarios();
    }

    public UsuarioDto obterUsario(String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            UsuarioDto usuarioDto = usuarioClient.obterUsario(usuarioId.getNameid(), token);

            if (usuarioDto != null && (usuarioDto.getSetores() == null || usuarioDto.getSetores().isEmpty())) {
                List<SetorDto> setorDtoList = new ArrayList<>();
                SetorDto setorDto = new SetorDto();
                setorDto.setId("66021f97260c3669d68a29ca");
                setorDto.setNome("TI");
                setorDto.setCategoria("desenvolvedor");
                setorDtoList.add(setorDto);
                usuarioDto.setSetores(setorDtoList);
            }

            return usuarioDto;
        }

        throw new Exception("Não foi possível obter dados do usuário. Usuário não encontrado");
    }

    public UsuarioDto cadastrarUsuario(CadastroUsuarioDto cadastroUsuario) throws Exception {
        EmailVerificacaoResponse emailVerificacaoResponse = loginClient.verificarSeEmailExiste(cadastroUsuario.getEmail());

        if (!emailVerificacaoResponse.getEmailExists()) {
            return usuarioClient.cadastrarUsuario(cadastroUsuario);
        }

        throw new Exception("Email já cadastrado por outro usuário");

    }

    public UsuarioDto editarUsuario(UsuarioDto usuario, String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            return usuarioClient.editarUsuario(usuarioId.getNameid(), usuario, token);
        }

        throw new Exception("Não foi possível editar dados do usuário. Usuário não encontrado");
    }

    public AlteracaoSenhaRetorno alterarSenha(AlteracaoSenhaDto novaSenha, String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            return usuarioClient.alterarSenha(usuarioId.getNameid(), token, novaSenha);
        }

        throw new Exception("Não foi possível solicitar alteração de senha. Usuário não encontrado");
    }

    public UsuarioDto removerUsuario(String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            return usuarioClient.removerUsuario(usuarioId.getNameid());
        }

        throw new Exception("Não foi possível exlcuir usuário. Usuário não encontrado");
    }

    public List<UsuarioDto> filtrarPorNome(String nome) {
        List<UsuarioDto> usuarioDtos = obterListaUsarios();

        return usuarioDtos.stream().filter(usuarioDto -> usuarioDto.getNome().toLowerCase().contains(nome.toLowerCase())).collect(Collectors.toList());
    }

}

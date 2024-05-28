package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.RegistroPontoClient;
import br.puc.novaapicontroller.dto.registroponto.PontoDto;
import br.puc.novaapicontroller.dto.registroponto.PontoSiteResponse;
import br.puc.novaapicontroller.dto.registroponto.SaldoDiario;
import br.puc.novaapicontroller.util.DateUtil;
import br.puc.novaapicontroller.util.LogUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

import static br.puc.novaapicontroller.util.DateUtil.stringToLocalDteTime;

@Service
@RequiredArgsConstructor
public class RegistroPontoService {

    private final RegistroPontoClient registroPontoClient;

    public List<PontoDto> obterListagemRegistroPontos() {
        return registroPontoClient.obterListagemRegistroPontos();
    }

    public PontoDto obterRegistroPonto(String registroId) throws Exception {
        return registroPontoClient.obterRegistros(registroId);
    }

    public PontoDto registrarPonto(PontoDto pontoDto) throws Exception {
        pontoDto.setDataRegistro(DateUtil.formatarDataISO(pontoDto.dataRegistro));
        return registroPontoClient.registrarPonto(pontoDto);
    }

    public PontoSiteResponse editarRegistroPonto(String id, PontoDto pontoDto) throws Exception {
        try {
            pontoDto.setInicioExpediente(pontoDto.getInicioExpediente() != null ? DateUtil.formatarDataISO(pontoDto.getInicioExpediente()) : null);
            pontoDto.setInicioIntervalo(pontoDto.getInicioIntervalo() != null ? DateUtil.formatarDataISO(pontoDto.getInicioIntervalo()) : null);
            pontoDto.setFimIntervalo(pontoDto.getFimIntervalo() != null ? DateUtil.formatarDataISO(pontoDto.getFimIntervalo()) : null);
            pontoDto.setFimExpediente(pontoDto.getFimExpediente() != null ? DateUtil.formatarDataISO(pontoDto.getFimExpediente()) : null);

            PontoDto pontoRetorno = registroPontoClient.editarRegistroPonto(id, pontoDto);

            LocalDateTime inicioExpediente = pontoDto.getInicioExpediente() != null ? stringToLocalDteTime(pontoDto.getInicioExpediente(), "yyyy-MM-dd'T'HH:mm:ss.SSS") : null;
            LocalDateTime inicioIntervalo = pontoDto.getInicioIntervalo() != null ? stringToLocalDteTime(pontoDto.getInicioIntervalo(), "yyyy-MM-dd'T'HH:mm:ss.SSS") : null;
            LocalDateTime fimIntervalo = pontoDto.getFimIntervalo() != null ? stringToLocalDteTime(pontoDto.getFimIntervalo(), "yyyy-MM-dd'T'HH:mm:ss.SSS") : null;
            LocalDateTime fimExpediente = pontoDto.getFimExpediente() != null ? stringToLocalDteTime(pontoDto.getFimExpediente(), "yyyy-MM-dd'T'HH:mm:ss.SSS") : null;

            SaldoDiario saldoDiario = calcularSaldo(inicioExpediente, inicioIntervalo, fimIntervalo, fimExpediente);

            return PontoSiteResponse.builder()
                    .id(pontoRetorno.getId())
                    .inicioExpediente(pontoRetorno.getInicioExpediente())
                    .inicioIntervalo(pontoRetorno.getInicioIntervalo())
                    .dataRegistro(pontoRetorno.getDataRegistro())
                    .fimExpediente(pontoRetorno.getFimExpediente())
                    .saldo(saldoDiario.getSaldo())
                    .isPositivo(saldoDiario.isPositivo())
                    .build();
        } catch (Exception e) {
            String erro = "Erro ao editar registro de ponto. Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "RegistroPontoService.java");
            throw new Exception(erro);
        }
    }

    public PontoDto removerPonto(String id) throws Exception {
        return registroPontoClient.removerPonto(id);
    }

    public static SaldoDiario calcularSaldo(LocalDateTime inicioExpediente, LocalDateTime inicioIntervalo, LocalDateTime fimIntervalo, LocalDateTime fimExpediente) {
        SaldoDiario saldoDiario = new SaldoDiario();

        Duration duracaoTotalTrabalho = Duration.ZERO;
        Duration duracaoExpediente = Duration.ofHours(8);

        if (inicioExpediente != null) {
            if (inicioIntervalo != null) {
                Duration inicioAteAlmoco = Duration.between(inicioExpediente, inicioIntervalo);
                duracaoTotalTrabalho = duracaoTotalTrabalho.plus(inicioAteAlmoco);

                if (fimIntervalo != null && fimExpediente != null) {
                    Duration voltaAlmocoAteFimExpediente = Duration.between(fimIntervalo, fimExpediente);
                    duracaoTotalTrabalho = duracaoTotalTrabalho.plus(voltaAlmocoAteFimExpediente);
                }
            } else if (fimExpediente != null) {
                duracaoTotalTrabalho = Duration.between(inicioExpediente, fimExpediente);
            }
        }

        Duration saldo = duracaoTotalTrabalho.minus(duracaoExpediente);

        saldoDiario.setPositivo(!saldo.isNegative());
        String saldoFormatado = formatarDuracao(saldo.abs());
        saldoDiario.setSaldo(saldoFormatado);

        return saldoDiario;
    }

    private static String formatarDuracao(Duration duration) {
        long hours = duration.toHours();
        long minutes = duration.minusHours(hours).toMinutes();
        return String.format("%02d:%02d", hours, minutes);
    }
}

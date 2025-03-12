import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AspirantesService } from './modulos/aspirantes/aspirantes.service';
import { AspirantesController } from './modulos/aspirantes/aspirantes.controller';
import { OrdenService } from './modulos/orden/orden.service';
import { OrderController } from './modulos/orden/orden.controller';
import { AntecedentesController } from './modulos/antecedentes/antecedentes.controller';
import { AntecedentesService } from './modulos/antecedentes/antecedentes.service';
import { DiagnosticosController } from './modulos/diagnosticos/diagnosticos.controller';
import { DiagnosticosService } from './modulos/diagnosticos/diagnosticos.service';
import { HistoriaClinicaService } from './modulos/historia-clinica/historia-clinica.service';
import { HistoriaClinicaController } from './modulos/historia-clinica/historia-clinica.controller';
import { TipoDocumentosService } from './modulos/tipo-documentos/tipo-documentos.service';
import { TipoDocumentosController } from './modulos/tipo-documentos/tipo-documentos.controller';
import { CiudadService } from './modulos/ciudad/ciudad.service';
import { CiudadController } from './modulos/ciudad/ciudad.controller';
import { NivelEducativoController } from './modulos/nivel-educativo/nivel-educativo.controller';
import { NivelEducativoService } from './modulos/nivel-educativo/nivel-educativo.service';
import { EmpresasController } from './modulos/empresas/empresas.controller';
import { EmpresasService } from './modulos/empresas/empresas.service';
import { RegimenService } from './modulos/regimen/regimen.service';
import { RegimenController } from './modulos/regimen/regimen.controller';
import { ActividadesEconomicasController } from './modulos/actividades-economicas/actividades-economicas.controller';
import { ActividadesEconomicasService } from './modulos/actividades-economicas/actividades-economicas.service';
import { FactorRiesgoFisicoService } from './modulos/factor-riesgo-fisico/factor-riesgo-fisico.service';
import { FactorRiesgoFisicoController } from './modulos/factor-riesgo-fisico/factor-riesgo-fisico.controller';
import { FactorRiesgoQuimicoService } from './modulos/factor-riesgo-quimico/factor-riesgo-quimico.service';
import { FactorRiesgoQuimicoController } from './modulos/factor-riesgo-quimico/factor-riesgo-quimico.controller';
import { FactorRiesgoBiologicoService } from './modulos/factor-riesgo-biologico/factor-riesgo-biologico.service';
import { FactorRiesgoBiologicoController } from './modulos/factor-riesgo-biologico/factor-riesgo-biologico.controller';
import { FactorRiesgoErgonomicoService } from './modulos/factor-riesgo-ergonomico/factor-riesgo-ergonomico.service';
import { FactorRiesgoErgonomicoController } from './modulos/factor-riesgo-ergonomico/factor-riesgo-ergonomico.controller';
import { FactorRiesgoPsicosocialController } from './modulos/factor-riesgo-psicosocial/factor-riesgo-psicosocial.controller';
import { FactorRiesgoPsicosocialService } from './modulos/factor-riesgo-psicosocial/factor-riesgo-psicosocial.service';
import { FactorRiesgoMecanicoService } from './modulos/factor-riesgo-mecanico/factor-riesgo-mecanico.service';
import { FactorRiesgoMecanicoController } from './modulos/factor-riesgo-mecanico/factor-riesgo-mecanico.controller';
import { FactorRiesgoElectricoController } from './modulos/factor-riesgo-electrico/factor-riesgo-electrico.controller';
import { FactorRiesgoElectricoService } from './modulos/factor-riesgo-electrico/factor-riesgo-electrico.service';
import { FactorRiesgoLocativoService } from './modulos/factor-riesgo-locativo/factor-riesgo-locativo.service';
import { FactorRiesgoLocativoController } from './modulos/factor-riesgo-locativo/factor-riesgo-locativo.controller';
import { ElementosProteccionPersonalController } from './modulos/elementos-proteccion-personal/elementos-proteccion-personal.controller';
import { ElementosProteccionPersonalService } from './modulos/elementos-proteccion-personal/elementos-proteccion-personal.service';
import { AuthController } from './modulos/auth/auth.controller';
import { AuthService } from './modulos/auth/auth.service';
import { AuthModule } from './modulos/auth/auth.module';
import { UploadFilesController } from './modulos/upload-files/upload-files.controller';
import { PrestadorController } from './modulos/prestador/prestador.controller';
import { PrestadorService } from './modulos/prestador/prestador.service';
import { HorarioTrabajoService } from './modulos/horario-trabajo/horario-trabajo.service';
import { HorarioTrabajoController } from './modulos/horario-trabajo/horario-trabajo.controller';
import { EpsService } from './modulos/eps/eps.service';
import { EpsController } from './modulos/eps/eps.controller';
import { ArlController } from './modulos/arl/arl.controller';
import { ArlService } from './modulos/arl/arl.service';
import { FondoPensionesService } from './modulos/fondo-pensiones/fondo-pensiones.service';
import { FondoPensionesController } from './modulos/fondo-pensiones/fondo-pensiones.controller';
import { EstadoCivilController } from './modulos/estado-civil/estado-civil.controller';
import { EstadoCivilService } from './modulos/estado-civil/estado-civil.service';
import { GrupoSanguineoService } from './modulos/grupo-sanguineo/grupo-sanguineo.service';
import { GrupoSanguineoController } from './modulos/grupo-sanguineo/grupo-sanguineo.controller';
import { ServiciosController } from './modulos/servicios/servicios.controller';
import { ServicioService } from './modulos/servicios/servicios.service';
import { PermisosController } from './modulos/permisos/permisos.controller';
import { PermisosService } from './modulos/permisos/permisos.service';
import { PerfilesController } from './modulos/perfiles/perfiles.controller';
import { PerfilesService } from './modulos/perfiles/perfiles.service';
import { ConsecutivosController } from './modulos/consecutivos/consecutivos.controller';
import { ConsecutivosService } from './modulos/consecutivos/consecutivos.service';
import { UsuariosController } from './modulos/usuarios/usuarios.controller';
import { UsuariosService } from './modulos/usuarios/usuarios.service';
import { EmailService } from './modulos/email/email.service';
import { EmailController } from './modulos/email/email.controller';
import { EmailModule } from './modulos/email/email.module';
import { CertificadosMedicosService } from './modulos/certificados-medicos/certificados-medicos.service';
import { CertificadosMedicosController } from './modulos/certificados-medicos/certificados-medicos.controller';
import { HttpModule } from '@nestjs/axios';
import { MedicosController } from './modulos/medicos/medicos.controller';
import { MedicosService } from './modulos/medicos/medicos.service';
import { EspecialidadesController } from './modulos/especialidades/especialidades.controller';
import { EspecialidadesService } from './modulos/especialidades/especialidades.service';
import { ConsultoriosService } from './modulos/consultorios/consultorios.service';
import { ConsultoriosController } from './modulos/consultorios/consultorios.controller';
import { AlmacenesController } from './modulos/almacenes/almacenes.controller';
import { AlmacenesService } from './modulos/almacenes/almacenes.service';
import { CitasController } from './modulos/citas/citas.controller';
import { CitasService } from './modulos/citas/citas.service';

@Module({
  imports: [AuthModule, EmailModule, HttpModule],
  controllers: [
    AppController,
    AspirantesController,
    AuthController,
    OrderController,
    AntecedentesController,
    DiagnosticosController,
    HistoriaClinicaController,
    TipoDocumentosController,
    CiudadController,
    NivelEducativoController,
    EmpresasController,
    RegimenController,
    ActividadesEconomicasController,
    FactorRiesgoFisicoController,
    FactorRiesgoQuimicoController,
    FactorRiesgoBiologicoController,
    FactorRiesgoErgonomicoController,
    FactorRiesgoPsicosocialController,
    FactorRiesgoMecanicoController,
    FactorRiesgoElectricoController,
    FactorRiesgoLocativoController,
    ElementosProteccionPersonalController,
    UploadFilesController,
    PrestadorController,
    HorarioTrabajoController,
    EpsController,
    ArlController,
    FondoPensionesController,
    GrupoSanguineoController,
    EstadoCivilController,
    ServiciosController,
    PermisosController,
    PerfilesController,
    ConsecutivosController,
    UsuariosController,
    EmailController,
    CertificadosMedicosController,
    MedicosController,
    EspecialidadesController,
    ConsultoriosController,
    AlmacenesController,
    CitasController,
  ],
  providers: [
    AppService,
    AspirantesService,
    AntecedentesService,
    OrdenService,
    DiagnosticosService,
    HistoriaClinicaService,
    TipoDocumentosService,
    CiudadService,
    AuthService,
    NivelEducativoService,
    EmpresasService,
    RegimenService,
    ActividadesEconomicasService,
    FactorRiesgoFisicoService,
    FactorRiesgoQuimicoService,
    FactorRiesgoBiologicoService,
    FactorRiesgoErgonomicoService,
    FactorRiesgoPsicosocialService,
    FactorRiesgoMecanicoService,
    FactorRiesgoElectricoService,
    FactorRiesgoLocativoService,
    ElementosProteccionPersonalService,
    PrestadorService,
    HorarioTrabajoService,
    EpsService,
    ArlService,
    FondoPensionesService,
    EstadoCivilService,
    GrupoSanguineoService,
    ServicioService,
    PermisosService,
    PerfilesService,
    ConsecutivosService,
    UsuariosService,
    EmailService,
    CertificadosMedicosService,
    MedicosService,
    EspecialidadesService,
    ConsultoriosService,
    AlmacenesService,
    CitasService,
  ],
})
export class AppModule {}

import { BadRequestException, Body, Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { editFileName } from './upload-files-helper';


//@ApiBearerAuth()
@ApiTags('upload-files')
@Controller('upload-files')
export class UploadFilesController {

  //  SUBIMOS UN ARCHIVO
  @ApiConsumes('multipart/form-data')
  @Post("uploadFile")
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({ 
        destination: (request, file, cb) => {
          const path = './src/uploads/companies/contratos/' + (new Date(Date.now()).toLocaleDateString()).replace('/', '_').replace('/', '_') + '/'
          if (!fs.existsSync(path)){
            fs.mkdirSync(path, { recursive: true })
          }
          return cb(null, `${path}`)
        },
        filename: editFileName
      })
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {    
    return {
        mensaje: 'Procedimiento ejecutado correctamente',
        descripcion: 'Se ha listado exitosamente',
        resultado:   `${process.env.URL_API_PRODUCTION}/upload-files/view/` + (new Date(Date.now()).toLocaleDateString()).replace('/', '_').replace('/', '_') + '/' + file.filename,
        status: true,
    };
  }

  // DEVOLVEMOS EL ARCHIVO PARA MOSTRAR CON LINK
  @Get("view/:date/:filename")
  async viewFile(@Param('filename') filename: string, @Param('date') date: string, @Res() res: Response) {
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.sendFile(filename, { root: './src/uploads/companies/contratos/' + date })
  }

  @ApiConsumes('multipart/form-data')
  @Post("uploadFile/prestador")
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({ 
        destination: (request, file, cb) => {
          const path = './src/uploads/prestador/' + (new Date(Date.now()).toLocaleDateString()).replace('/', '_').replace('/', '_') + '/'
          if (!fs.existsSync(path)){
            fs.mkdirSync(path, { recursive: true })
          }
          return cb(null, `${path}`)
        },
        filename: editFileName
      })
    })
  )
  uploadFilePrestador(@UploadedFile() file: Express.Multer.File) {    
    return {
        mensaje: 'Procedimiento ejecutado correctamente',
        descripcion: 'Se ha listado exitosamente',
        resultado:   `${process.env.URL_API_PRODUCTION}/upload-files/view/` + (new Date(Date.now()).toLocaleDateString()).replace('/', '_').replace('/', '_') + '/' + file.filename,
        status: true,
    };
  }

  @ApiConsumes('multipart/form-data')
  @Post("uploadFile/certificados-medicos")
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({ 
        destination: (request, file, cb) => {
          const path = './src/uploads/certificados/' + (new Date(Date.now()).toLocaleDateString()).replace('/', '_').replace('/', '_') + '/'
          if (!fs.existsSync(path)){
            fs.mkdirSync(path, { recursive: true })
          }
          return cb(null, `${path}`)
        },
        filename: editFileName
      })
    })
  )
  uploadFileCertificados(@UploadedFile() file: Express.Multer.File) {    
    return {
        mensaje: 'Procedimiento ejecutado correctamente',
        descripcion: 'Se ha listado exitosamente',
        resultado:   `${process.env.URL_API_PRODUCTION}/upload-files/viewCertificado/` + (new Date(Date.now()).toLocaleDateString()).replace('/', '_').replace('/', '_') + '/' + file.filename,
        status: true,
    };
  }

  @Get("viewCertificado/:date/:filename")
  async viewFileCertificado(@Param('filename') filename: string, @Param('date') date: string, @Res() res: Response) {
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.sendFile(filename, { root: './src/uploads/certificados/' + date })
  }

}
import cloudinary from "@/utils/cloudnary";

class CloudinaryServices {
  /**
   * Faz upload de uma imagem para o Cloudinary
   * @param imagePath Caminho do arquivo (ex.: ./uploads/foto.jpg)
   * @returns URL segura da imagem no Cloudinary
   */

  async upload(fileBuffer: Buffer, fileName: string, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      
    cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: fileName,
          format: "jpg",
          overwrite: true,
          resource_type: "image",
        },
        (error:any, result:any) => {
          if (error) return reject(error);
          resolve(result?.secure_url);
        }
      )
      .end(fileBuffer);
  });
  }

  /**
   * Remove uma imagem do Cloudinary
   * @param publicId
   */
  async destroy(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }
}

export default new CloudinaryServices();
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { v2 as cloudinary, UploadApiResponse  } from "cloudinary";

export async function GET(){
  try{
      const AllProduits = await prisma.product.findMany()
      return NextResponse.json(AllProduits)
  }catch(erreur){
    console.error('erreur:',erreur)
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result as UploadApiResponse);
        }
      );
      stream.end(buffer);
    });

    const product = await prisma.product.create({
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        imageUrl: uploadResult.secure_url,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}


export async function DELETE (req:Request){
      try {
        const body = await req.json()
        const productid  = Number(body.id) 
        const deleteProduct = await prisma.product.delete({
          where : {id: productid}
        })
        return NextResponse.json({message:"supprime avec succes"},deleteProduct)
      }catch(erreur){
        console.error("erreur:",erreur)
        return NextResponse.json({message:"erreur lors de la suppression merci de reassayer"})
      }
}

export async function PATCH (req:Request) {
  const body = await req.json()
  const id = Number( body.id)
  const productEdit = await prisma.product.update({
    where:{id},
    data : {
          name: body.name,
          desc: body.desc,
          price: body.price
    }
  })
  return NextResponse.json({message:"produit modifié avec succes"},productEdit)

}
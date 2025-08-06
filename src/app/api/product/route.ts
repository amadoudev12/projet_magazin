import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(){
  try{
      const AllProduits = await prisma.product.findMany()
      return NextResponse.json(AllProduits)
  }catch(erreur){
    console.error('erreur:',erreur)
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  
  const file = formData.get("image") as File | null;
  if (!file) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });

  // On sauvegarde le fichier
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "public/uploads", file.name);
  await writeFile(filePath, buffer);

  const product = await prisma.product.create({
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      imageUrl: `/uploads/${file.name}`,
    },
  });

  return NextResponse.json(product, { status: 201 });
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
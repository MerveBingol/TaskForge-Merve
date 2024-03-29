import Column from "../models/Column.js"
const addColumn= async(req,res)=>{
    try {
        const {newColumn}=req.body;

        const column =Column.create({
            columnId:newColumn.id,
            columnName:newColumn.title,
            project:newColumn.projectId

        })
        res.status(200).json({succeed:true,message:"Kolon ekleme başarılı"});


    } catch (error) {
        res.status(500).json({succeed:false,message:"sever error"+ error.message})

    }
}
    const updateColumn=async(req,res)=>{
        try {
            const {newColumn} =req.body;
            const updateColumn = await Column.findByIdAndUpdate(
                {project:newColumn.projectId,columnName:newColumn.oldColumn},
                {columnName:newColumn.columnName},
                {new:true}
            );
            if (!updateColumn) {
                return res.status(404).json({succeed:false,message:"güncellenmiş kolon bulunanmadı"});
    
            }
            res.status(200).json({succeed:true,message:"Kolon güncelleme başarılı",updateColumn})
    
        } catch (error) {
            console.error("hata: ",error);
            res.status(500).json({succeed:false,message:"sunucu hatası",error});
    
        }
    };
    const getColumn = async(req,res)=>{
        const{projectId}=req.body;
        const columns=await Column.find({project:projectId})
        if(!columns){
            res.status(400).json({succeed:false,message:"Kolonlar bulunamadı"})
    
        }
        res.status(200).json(columns)
    }

// const updateColumn=async(req,res)=>{
//     try {
//         const {newColumn} =req.body;
//         const updateColumn = await Column.findByIdAndUpdate(
//             {project:newColumn.projectId,title:newColumn.oldtitle},
//             {oldtitle:newColumn.columnName},
           
           
//         );
//         if (!updateColumn) {
//             return res.status(404).json({succeed:false,message:"güncellenmiş kolon bulunanmadı"});

//         }
//         res.status(200).json({succeed:true,message:"Kolon güncelleme başarılı",updateColumn})

//     } catch (error) {
//         console.error("hata: ",error);
//         res.status(500).json({succeed:false,message:"sunucu hatası",error});

//     }
// };

// const UpdateColumnName = async (req,res)=>{
//     try {
//         const { columnId, newTitle } = req.body;
    
        
//         const updatedColumn = await Column.findByIdAndUpdate(
//           columnId,
//           { title: newTitle },
//           { new: true } 
//         );
    
//         if (!updatedColumn) {
//             console.log("Nil anka mı diyim");
//           return res.status(404).json({ error: 'Kolon bulunamadı.' });
        
//         }
    
//         res.json(updatedColumn);
//       } catch (error) {
//         console.error('Kolon güncelleme hatası:', error);
//         console.log("ne oldu sana Hiroş")
//         res.status(500).json({ error: 'Internal Server Error' });
//       }

    // try{
    //     const {title,projectId}=req.body;

    //     const updateColumn =await Column.findByIdAndUpdate(
    //         {project:projectId,title:title},
    //          {new:true}
    //     );
    //     if(!updateColumn){
    //         return res.status(404).json({succeed:false,message:"güncellenmiş kolon ismi bulunamadı"});
    //     }
    //     res.status(200).json({succeed:true,message:"kolon güncelleme başarılı",updateColumn});
    // }catch(error){
    //     console.error("hata:",error);
    //     res.status(500).json({succeed:false,message:"burada hata Sunucu hatası",error})

    // }
//};
// const getColumn = async(req,res)=>{
//     const{projectId}=req.body;
//     const columns=await Column.find({project:projectId})
//     if(!columns){
//         res.status(400).json({succeed:false,message:"Kolonlar bulunamadı"})

//     }
//     res.status(200).json(columns)
// }

const DeleteColumn= async (req,res)=>{
    try {
        const {project} =req.body;

console.log(project.projectId,"backeddd")
console.log(project.columnName,"bcc")

        const columnToDelete = await Column.findOne({
            project: project.projectId,
            columnName: project.columnName
          });
       // const DeleteColumn = await Column.deleteOne({columnId:id});

       if (!columnToDelete) {
        return res.status(404).json({ succeed: false, message: "Silinecek kolon bulunamadı" });
      }


      await Column.findByIdAndDelete(columnToDelete._id);
      return res.status(200).json({ succeed: true, message: "Kolon başarıyla silindi" });
    } catch (error) {
      console.error("Hata:", error);
      return res.status(500).json({ succeed: false, message: "Sunucu hatası", error });
    }
  };


export{addColumn,updateColumn,getColumn,DeleteColumn}
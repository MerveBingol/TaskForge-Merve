import Customer from "../models/Customer.js";
import Project from "../models/Project.js";

const addProject =async(req,res)=>{
   /*  try{  
    console.log("addproject controller")
        const {customerId,customerProjectName,customerEmail} = req.body;
        console.log("addproject 2",customerProjectName)
        console.log("addproject 3",customerEmail)
        console.log("addproject 3",customerId)


        const isEmailValid = validateEmail(customerEmail);
        if (!isEmailValid) {
        return res.status(400).json({ success: false, message: 'Geçerli bir email adresi giriniz.' });
      }

      const project = await Project.create({
        projectName:customerProjectName,
        customer:customerId,
        // tasks:[], 
      })
        await project.save();
        res.status(200).json({message:'project added successfully'})
      
    } catch (error) {
      
    }*/
    }
    const getProjects =async (req,res)=>{
      try {
         const {creatorID}=req.body;
      //console.log("meltem",creatorID)
      const projects = await Project.find({ creatorID: creatorID });
      res.status(200).json(projects)
      } catch (error) {
        
      }
     
      
  }
  const projectDetails =async (req,res)=>{
      try {
      
          const {id} = req.body;
      console.log("bu gelen id:",id)
          const project = await Project.findById(id);
          res.status(200).json(project);
      
      
        } catch (error) {
          res.status(500).json({message:"server hatası."})
        }
  }
  const deleteProject= async(req,res)=>{
  
    try {
      const {projectId}= req.body;
     console.log("deleteProject projectId",projectId)
      const project = await Project.findByIdAndDelete(projectId);
  
      if(!project){
       
        res.status(404).json({succeed:false,message:"Project was not found"})
      }
      res.status(200).json({succeed:true,message:"Project has been deleted succesfully" })
     
    } catch (error) {
      
      
    }
  }
  

export{addProject,getProjects,projectDetails,deleteProject}
import toastr from 'toastr'

const notifyMe = (req, res) => {
   // console.log(req)
    if (req.success){
        toastr.success(req.message, req.data.name)
    }else {
        toastr.warning(req.message, "Warning")
    }

    
}

export default {
    notifyMe
}
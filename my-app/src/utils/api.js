const uris = {
    signupUrl : '/users/signup',
    loginUrl : '/users/login',
    deleteStudent : '/students',
    updateStudent : '/students',
    createStudent : '/students',
    updateSubmitDate : '/students/modify-date'
};


 const apiPathBuilder = (routeName,params) => {
    const baseRoute = uris[routeName];
    const Params = params? `/${params}` : '';

    const uri =  baseRoute + Params;
    console.log(uri);
    return uri
};

export default apiPathBuilder;
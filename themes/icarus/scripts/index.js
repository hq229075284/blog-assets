hexo.extend.helper.register('isMatch', function (regList,str) {
    for(r of regList){
        const reg=new RegExp(r)
        if(reg.test(str)){
            return true
        }
    }
    return false
})

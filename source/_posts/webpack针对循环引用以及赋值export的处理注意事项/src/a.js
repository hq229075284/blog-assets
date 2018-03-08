import {_console} from './index'

export default function(){
  console.log('this is a.js')
}

try{
  _console()
}catch(e){
  console.error('_console\'s typeof->', _console)
}
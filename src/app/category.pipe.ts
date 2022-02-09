import { Pipe, PipeTransform } from '@angular/core';
import { StringDecoder } from 'string_decoder';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform( list: any, value: number) {
    if(!list || !value){
      return list;
    }
    return value ? list.filter(lst => lst.IsComplete ==value) :list;
  }

}

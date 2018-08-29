import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Utils} from '../../utils/utils';
import {MatPaginator, MatSort} from '@angular/material';

@Component({})
export abstract class BaseListComponent  {
  public isClearSeach = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // filtro de pesquisa- exibir e ocultar o botão de filtro
  public changeFieldEvent(event) {
    this.isClearSeach = (event !== null && event !== '');
  }


  /* limpa o campo de pesquisa quando for um auto-complete*/
  public clearFilter(form: NgForm) {
    form.resetForm({});
    if (this.isClearSeach) {
      this.isClearSeach = false;
    }
    this.retrieveList();

  }

  public abstract retrieveList();

  public setParameterPaginator(queryParameter: {}, service: any) {
    let caracterOrder = '';
    if (this.sort.direction === 'desc') {
      caracterOrder = '-';
    }
    const size = String(this.paginator.pageSize);
    const order = String(caracterOrder + '' + this.sort.active);
    const page = this.paginator.pageIndex;
    service.addParameter('limit', size);
    service.addParameter('ordering', order);
    service.addParameter('offset', String(Utils.getOffset(page, +size)));
    queryParameter['size'] = size;
    queryParameter['page'] = page;
    queryParameter['order_item'] = this.sort.active;
    if(this.sort.direction) {
      queryParameter['sort'] = this.sort.direction;
    }
  }


  public initParameterPaginatorByQueryParamenter(queryParameter: {}) {
    if(queryParameter['sort']) {
      this.sort.direction = queryParameter['sort'];
    }
    if(queryParameter['size']){
      this.paginator.pageSize = queryParameter['size'];
    }
    if( queryParameter['order_item']) {
      this.sort.active = queryParameter['order_item'];
    }
    if(queryParameter['page']) {
      this.paginator.pageIndex   =   queryParameter['page'];
    }
  }

}





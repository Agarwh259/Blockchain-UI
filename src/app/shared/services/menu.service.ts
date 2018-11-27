import { Injectable } from '@angular/core';
import { MENU_ITEM_MMIS,MENU_ITEM_IEES,MENU_ITEM_MCO } from '../../pages/menu';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable()
export class menuService {

  constructor(public _globalService: GlobalService, private _router: Router) {
    if(sessionStorage.getItem('Role') === 'MMIS'){
    this.getNodePath(MENU_ITEM_MMIS);
    }
    else if(sessionStorage.getItem('Role') === 'IEES'){
      this.getNodePath(MENU_ITEM_IEES);
    }
    else if(sessionStorage.getItem('Role') === 'MCO'){
        this.getNodePath(MENU_ITEM_MCO);
    }
  }

  private parent_node = null;
  private node = null;
  private path_item = [];

  protected queryParentNode(json: any, node_id: any) {
    for (let i = 0; i < json.length; i++) {
      if (this.node)
        break;
      const object = json[i];
      if (!object || !object.path)
        continue;
      if (object.path === node_id) {
        this.node = object;
        break;
      } else {
        if (object.children) {
          this.parent_node = object;
          this.queryParentNode(object.children, node_id);
        } else {
          continue;
        }
      }
    }
    if (!this.node)
      this.parent_node = null;
    return {
      parent_node: this.parent_node,
      node: this.node
    };
  }

  protected creatRouterLink(nodeId: any) {
    this.node = null;
    this.parent_node = null;
    let menuObj = null;
    if(sessionStorage.getItem('Role') === 'MMIS'){
        menuObj = this.queryParentNode(MENU_ITEM_MMIS, nodeId);
    }
    else if(sessionStorage.getItem('Role') === 'IEES'){
      menuObj = this.queryParentNode(MENU_ITEM_IEES, nodeId);
    }
    else if(sessionStorage.getItem('Role') === 'MCO'){
      menuObj = this.queryParentNode(MENU_ITEM_MCO, nodeId);
    }
    if (menuObj.parent_node && menuObj.parent_node.path) {
      this.path_item.unshift(menuObj.parent_node.path);
      return this.creatRouterLink(menuObj.parent_node.path);
    } else {
      return this.path_item;
    }
  }

  protected getNodePath(json: any): void {
    json.forEach((index) => {
      if (index.children) {
        //delete index.routerLink;
        this.getNodePath(index.children);
        index.toggle = 'init';
      } else {
        this.path_item = [index.path];
        index.routerLink = this.creatRouterLink(index.path);
        index.routerLink.unshift('/', 'pages');
      }
      console.log(index);
    })
  }

  public putSidebarJson() {
    if(sessionStorage.getItem('Role') === 'MMIS'){
      return MENU_ITEM_MMIS;
    }
    else if(sessionStorage.getItem('Role') === 'IEES'){
      return MENU_ITEM_IEES;
    }
  else if(sessionStorage.getItem('Role') === 'MCO'){
      return MENU_ITEM_MCO;
  }
  }

  public selectItem(item) {
    item.forEach(element => {
      if (element.routerLink) {
        element.isActive = this._router.isActive(this._router.createUrlTree(element.routerLink), true);
        if (element.isActive)
          //this._globalService._isActived(element);
          this._globalService.dataBusChanged('isActived', element);
      } else if (element.children)
        this.selectItem(element.children);
    });
  }

}

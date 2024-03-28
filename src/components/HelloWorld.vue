<template>
  <div class="hello">
    <el-row v-loading="loading">
      <el-col :span="9">
        <el-card class="right" shadow="always">
          <div slot="header" class="clearfix">
            <div class="card-header">
              <div class="header-title">全部</div>
              <el-input v-model="allSearchValue" placeholder="名称" clearable @clear="clearSearchValue">
                <el-button slot="append" icon="el-icon-search" @click="searchEquip()"></el-button>
              </el-input>
            </div>
          </div>
          <el-button @click="handleAllChange" icon="el-icon-circle-check">全选</el-button>
          <el-button @click="handleCancelAll" icon="el-icon-circle-close">取消全选</el-button>
          <el-tree
            class="custom-tree"
            ref="tree"
            node-key="id"
            show-checkbox
            :filter-node-method="filterNode"
            :check-strictly="false"
            :data="treeData"
            :props="defaultProps"
          >
            <span slot-scope="{ node, data }">
              <i :class="data.LockStatus === 1 ? 'el-icon-lock':'el-icon-unlock'"></i><span class="custom-tree-node">{{ node.label }}</span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :offset="1" :span="3" style="min-width: 200px">
        <el-card class="middle" shadow="always">
          <div slot="header" class="clearfix">
            <span>操作</span>
          </div>
          <el-button @click="addEquip()" icon="el-icon-right" class="lock-resource-button"></el-button>
          <el-button @click="deleteEquip()" icon="el-icon-back" class="lock-resource-button"></el-button>
          <el-button @click="saveEquip()" icon="el-icon-folder-checked" class="lock-resource-button">保存</el-button>
        </el-card>
      </el-col>
      <el-col :offset="1" :span="9">
        <el-card class="right" shadow="always">
          <div slot="header" class="clearfix">
            <span>已选资源列表</span>
          </div>
          <el-button @click="handleAllChangeAfter" icon="el-icon-circle-check">全选</el-button>
          <el-button @click="handleCancelAllAfter" icon="el-icon-circle-close">取消全选</el-button>
          <el-tree
            class="custom-tree"
            ref="afterTree"
            node-key="id"
            show-checkbox
            :check-strictly="false"
            :data="afterTreeData"
            :props="defaultProps"
          >
            <span slot-scope="{ node, data }">
              <i :class="data.LockStatus === 1 ? 'el-icon-lock':'el-icon-unlock'"></i><span class="custom-tree-node">{{ node.label }}</span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatTree } from './arrayTotree'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      input: "",
      userId: "",
      checkResourceId: 1,
      loading: false,
      // 资源树数据
      treeData: [],
      afterTreeData: [],
      // 用户数据
      userItem: [
        // { radioName: "item1", label: "0" },
      ],
      defaultProps: {
        children: "children",
        label: "name",
      },
      defaultData: [
        {
          id :"21c8df2b-2a23-4079-a815-523dcb7cd29a",
          name :"Pc端测试",
          parentId :null,
          showStatus :0,
          lockStatus :0,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :[
            {
              id :"43abb724-1ebe-4c9d-ab9f-0dc99e395f35",
              name :"20180521",
              parentId :"21c8df2b-2a23-4079-a815-523dcb7cd29a",
              showStatus :0,
              lockStatus :0,
              hasChildren :null,
              tenantId :0,
              type :null,
              children :[
                {
                   id :"acf92bf0-ad39-49d3-928a-70733b1bf469",
                   name :"双饰面",
                   parentId :"43abb724-1ebe-4c9d-ab9f-0dc99e395f35",
                   showStatus :0,
                   lockStatus :0,
                   hasChildren :null,
                   tenantId :0,
                   type :null,
                   children :[
                    {
                      id :"0fdfeb08-8568-4bac-bd17-455afafc5108",
                      name :"常规木纹板",
                      parentId :"acf92bf0-ad39-49d3-928a-70733b1bf469",
                      showStatus :0,
                      lockStatus :0,
                      hasChildren :null,
                      tenantId :0,
                      type :null,
                      children :[
                        {
                          id :"7231c8fe-6c33-4d0f-8183-d50f353a775d",
                          name :"一体盆主柜",
                          parentId :"0fdfeb08-8568-4bac-bd17-455afafc5108",
                          showStatus :0,
                          lockStatus :1,
                          hasChildren :null,
                          tenantId :0,
                          type :null,
                          children :null
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id :"df8fa566-b891-11e7-8322-000c29452d27",
          name :"衣柜产品库",
          parentId :null,
          showStatus :0,
          lockStatus :1,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :null
        },
        {
          id :"26ae6094-c0e4-4659-bc2e-4b3a51829cd4",
          name :"木门产品库",
          parentId :null,
          showStatus :0,
          lockStatus :1,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :null
        },
        {
          id :"ec5d43af-8ad5-4e73-9a51-bbe2b31574a4",
          name :"橱柜产品库",
          parentId :null,
          showStatus :0,
          lockStatus :1,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :null
        },
        {
          id :"cd56c3ab-0ea7-4a94-9009-89acbb7eb3b3",
          name :"卫浴产品库",
          parentId :null,
          showStatus :0,
          lockStatus :1,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :null
        },
        {
          id :"45843c4f-c1c4-4066-968c-2a3d0e5cc924",
          name :"平台卫浴产品库",
          parentId :null,
          showStatus :0,
          lockStatus :1,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :[
            {
              id :"2f3dc30b-c0c7-46fb-9532-33b25c727779",
              name :"一体盆主柜",
              parentId :"45843c4f-c1c4-4066-968c-2a3d0e5cc924",
              showStatus :0,
              lockStatus :0,
              hasChildren :null,
              tenantId :0,
              type :null,
              children :[
                {
                   id :"b7949471-6080-48b5-b13c-f3e17a3d030f",
                   name :"DT-0104-017(PBDPD002Z)",
                   parentId :"2f3dc30b-c0c7-46fb-9532-33b25c727779",
                   showStatus :0,
                   lockStatus :1,
                   hasChildren :null,
                   tenantId :0,
                   type :null,
                   children :null
                }
              ]
            },
            {
              id :"cf92c49b-8e1f-499d-8b59-7d03663a2366",
              name :"单门主柜",
              parentId :"45843c4f-c1c4-4066-968c-2a3d0e5cc924",
              showStatus :0,
              lockStatus :1,
              hasChildren :null,
              tenantId :0,
              type :null,
              children :null
            },
            {
              id :"0717365a-5517-4b05-9981-8e726238aa71",
              name :"一体盆主柜",
              parentId :"45843c4f-c1c4-4066-968c-2a3d0e5cc924",
              showStatus :0,
              lockStatus :1,
              hasChildren :null,
              tenantId :0,
              type :null,
              children :null
            },
            {
              id :"cfdbc7c4-b620-4026-a5e7-aaca3026a049",
              name :"一体盆主柜",
              parentId :"45843c4f-c1c4-4066-968c-2a3d0e5cc924",
              showStatus :0,
              lockStatus :1,
              hasChildren :null,
              tenantId :0,
              type :null,
              children :null
            },
            {
              id :"6c12bd02-c16c-4e8c-9634-4e1f4ca9b1e0",
              name :"浴缸吊柜",
              parentId :"45843c4f-c1c4-4066-968c-2a3d0e5cc924",
              showStatus :0,
              lockStatus :0,
              hasChildren :null,
              tenantId :0,
              type :null,
              children :[
                {
                  id :"f812dafa-9280-4209-89ed-305accf67a24",
                  name :"600-900",
                  parentId :"6c12bd02-c16c-4e8c-9634-4e1f4ca9b1e0",
                  showStatus :0,
                  lockStatus :1,
                  hasChildren :null,
                  tenantId :0,
                  type :null,
                  children :null
                }
              ]
            },
            {
              id :"dca9342d-4f22-40ba-82dc-115b823258d4",
              name :"其他",
              parentId :"45843c4f-c1c4-4066-968c-2a3d0e5cc924",
              showStatus :0,
              lockStatus :0,
              hasChildren :null,
              tenantId :0,
              type :null,
              children :[
                {
                  id :"7af4cb36-ff8d-476c-9b8c-1670384997d8",
                  name :"测试吊码",
                  parentId :"dca9342d-4f22-40ba-82dc-115b823258d4",
                  showStatus :0,
                  lockStatus :1,
                  hasChildren :null,
                  tenantId :0,
                  type :null,
                  children :null
                }
              ]
            }
          ]
        },
        {
          id :"c4693fd4-6eb0-4a57-abc5-cb2945618e13",
          name :"平台衣柜产品库",
          parentId :null,
          showStatus :0,
          lockStatus :1,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :null
        },
        {
          id :"d62d22d2-5617-47b7-a84c-8b210342e4e2",
          name :"平台橱柜产品库",
          parentId :null,
          showStatus :0,
          lockStatus :1,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :[
            {
              id :"b69d491c-3f76-4092-becc-7cb30e197582",
              name :"测试练习库",
              parentId :"d62d22d2-5617-47b7-a84c-8b210342e4e2",
              showStatus :0,
              lockStatus :0,
              hasChildren :null,
              tenantId :0,
              type :null,
              children :[
                {
                  id :"6fd5354b982d280613b82d09f3bf6e14",
                  name :"胡列测试",
                  parentId :"b69d491c-3f76-4092-becc-7cb30e197582",
                  showStatus :0,
                  lockStatus :0,
                  hasChildren :null,
                  tenantId :0,
                  type :null,
                  children :[
                    {
                      id :"e6a05944cedf412521bab6368a89e03d",
                      name :"王全非标设计测试",
                      parentId :"6fd5354b982d280613b82d09f3bf6e14",
                      showStatus :0,
                      lockStatus :1,
                      hasChildren :null,
                      tenantId :0,
                      type :null,
                      children :null
                    }
                  ]
                },
                {
                   id :"c570d407-4de6-4fa3-91da-e788eeed54c1",
                   name :"王全非标设计测试",
                   parentId :"b69d491c-3f76-4092-becc-7cb30e197582",
                   showStatus :0,
                   lockStatus :1,
                   hasChildren :null,
                   tenantId :0,
                   type :null,
                   children :null
                        }
                    ]
                }
            ]
        },
        {
          id :"2ccf4004-b575-11ec-9061-b8599f3f11ce",
          name :"金属门窗产品库",
          parentId :null,
          showStatus :0,
          lockStatus :1,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :[
            {
              id :"bc293084377ca2aa1df08c9520bccae6",
              name :"胡列测试",
              parentId :"2ccf4004-b575-11ec-9061-b8599f3f11ce",
              showStatus :0,
              lockStatus :0,
              hasChildren :null,
              tenantId :0,
              type :null,
              children :[
                {
                   id :"b4bfdbcaf6b04c5ba08abca7626162d2",
                   name :"王全非标设计测试",
                   parentId :"bc293084377ca2aa1df08c9520bccae6",
                   showStatus :0,
                   lockStatus :1,
                   hasChildren :null,
                   tenantId :0,
                   type :null,
                   children :null
                }
              ]
            }
          ]
        },
        {
          id :"82d48cb2-ad42-421b-9839-d14405f2e378",
          name :"装甲门产品库",
          parentId :null,
          showStatus :0,
          lockStatus :1,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :null
        }
      ],
      defaultAfterData: [
        {
          id :"21c8df2b-2a23-4079-a815-523dcb7cd29a",
          name :"Pc端测试",
          parentId :null,
          showStatus :0,
          lockStatus :0,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :[
            {
              id :"43abb724-1ebe-4c9d-ab9f-0dc99e395f35",
              name :"20180521",
              parentId :"21c8df2b-2a23-4079-a815-523dcb7cd29a",
              showStatus :0,
              lockStatus :0,
              hasChildren :null,
              tenantId :0,
              type :null,
              children :[
                {
                   id :"acf92bf0-ad39-49d3-928a-70733b1bf469",
                   name :"双饰面",
                   parentId :"43abb724-1ebe-4c9d-ab9f-0dc99e395f35",
                   showStatus :0,
                   lockStatus :0,
                   hasChildren :null,
                   tenantId :0,
                   type :null,
                   children :[
                    {
                      id :"0fdfeb08-8568-4bac-bd17-455afafc5108",
                      name :"常规木纹板",
                      parentId :"acf92bf0-ad39-49d3-928a-70733b1bf469",
                      showStatus :0,
                      lockStatus :0,
                      hasChildren :null,
                      tenantId :0,
                      type :null,
                      children :[
                        {
                          id :"7231c8fe-6c33-4d0f-8183-d50f353a775d",
                          name :"一体盆主柜",
                          parentId :"0fdfeb08-8568-4bac-bd17-455afafc5108",
                          showStatus :0,
                          lockStatus :1,
                          hasChildren :null,
                          tenantId :0,
                          type :null,
                          children :null
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id :"df8fa566-b891-11e7-8322-000c29452d27",
          name :"衣柜产品库",
          parentId :null,
          showStatus :0,
          lockStatus :1,
          hasChildren :null,
          tenantId :0,
          type :null,
          children :null
        }
      ],
      allSearchValue: undefined,
    };
  },
  mounted() {
    this.treeData = this.jsonToTree(this.defaultData)
    this.afterTreeData = this.jsonToTree(this.defaultAfterData)
  },
  methods: {
    // 将json类型数据转换为树形结构
    jsonToTree(source) {
      var setting = {
        check: {
          enable: true,
          chkboxType: { "Y" :"", "N" :"s" }
        },
        data: {
          key: {
              name: "name"
          },
          simpleData: {
            enable: false,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: null
          }
        },
        view: {
          fontCss: {size: "20px"}
        }
      };
      let cloneData = JSON.parse(JSON.stringify(source));
      return cloneData.filter((father) => {
        let branchArr = cloneData.filter(
          (child) => father.id == child.parentId
        );
        branchArr.length > 0 ? (father.children = branchArr) : "";
        return father.parentId == null;
      });
    },
    //设置全部展开和折叠。state参数为bool值
    setAllExpand(state) {
      var nodes = this.$refs.tree.store.nodesMap;
      for (var i in nodes) {
        nodes[i].expanded = state;
      }
    },
    handleCheckChange() {
      //获取选中的节点，包括父节点、子节点、半选中节点
      let data = this.$refs.tree.getCheckedNodes(false, true)

      //为了防止数据里包含子节点数据，这里只取一级数据
      let selectData = data.map(e => {
        return {
          id: e.id,
          name: e.name,
          parentId: e.parentId,
        }
      })
      // 初始状态右侧列表包含的数据
      let arrToNewTree = []
      this.getArrToData(arrToNewTree, this.afterTreeData, "children")
      let defaultData = arrToNewTree.map(e => {
        return {
          id: e.id,
          name: e.name,
          parentId: e.parentId,
        }
      })
      let resultData = defaultData.concat(selectData)
      // 数组去重
      const map = new Map()
      resultData = resultData.filter(key => !map.has(key.id) && map.set(key.id, 1))
      //将组装的数据转成树形数据，再右侧显示
      this.afterTreeData = formatTree(resultData)
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 资源树点击事件
    nodeClick() {},
    // 筛选全部目录
    filterResource(lockStatus) {
      this.loading = true
    },
    handleAllChange() {
      this.$refs.tree.setCheckedNodes(this.treeData);
    },
    handleCancelAll() {
      this.$refs.tree.setCheckedNodes([]);
    },
    handleAllChangeAfter() {
      this.$refs.afterTree.setCheckedNodes(this.afterTreeData);
    },
    handleCancelAllAfter() {
      this.$refs.afterTree.setCheckedNodes([]);
    },
    searchEquip() {
      this.$refs.tree.filter(this.allSearchValue)
    },
    clearSearchValue() {
      this.$refs.tree.filter('')
    },
    addEquip() {
      this.handleCheckChange()
      this.handleCancelAll()
    },
    deleteEquip() {
      const data = this.$refs.afterTree.getCheckedNodes();
      //为了防止数据里包含子节点数据，这里只取一级数据
      let selectData = data.map(e => {
        return {
          id: e.id,
          name: e.name,
          parentId: e.parentId,
        }
      })
      let arrToNewTree = []
      this.getArrToData(arrToNewTree, this.afterTreeData, "children")
      // 初始状态右侧列表包含的数据
      let defaultData = arrToNewTree.map(e => {
        return {
          id: e.id,
          name: e.name,
          parentId: e.parentId,
        }
      })
      // 从右侧列表删除已选中的数据
      selectData.forEach(selectItem => {
        defaultData.forEach((element, index) => {
          if (element.id === selectItem.id) {
            defaultData.splice(index, 1)
          }
        })
      })

      let resultData = defaultData
      this.afterTreeData = formatTree(resultData)
    },
    saveEquip() {
      alert("处理结果打印在‘afterTreeData’")
      console.log("afterTreeData", this.afterTreeData)
    },
    getArrToData(newSource,source,children,name,lvl) {
      for (let i in source) {
        if(name && lvl){
          source[i][name] = (Array(lvl+1).join(" ") + source[i][name]).slice(-(source[i][name].length+lvl));
        }
        let cloneData = JSON.parse(JSON.stringify(source[i]));
        delete cloneData[children];
        newSource.push(cloneData);
        if(source[i][children] && source[i][children].length > 0){
          this.getArrToData(newSource,source[i][children],children,name,lvl+1)
        }
      }
    }
  }
}
</script>

<style scoped>
.basic-container {
  height: calc(100% - 10px);
}
  .el-card__body {
    height: 100%;
  }
    .el-row {
      height: 100%;
    }
      .el-col-10 {
        height: 100%;
      }
.lock-resource-button{
  width: 120px;
  display: block;
  margin-left: 10px;
  margin-top: 10px;
}
.left {
  min-height: 300px;
  max-width: 100%;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 700px;
  overflow: auto;
}
.middle {
  text-align: center;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.right {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: auto;
}
.right .el-card__body {
  height: calc(100% - 55px);
}
.custom-tree {
  margin-top: 12px;
}
.custom-tree-node {
  display:inline-block;
  margin-left:2px;
}
</style>

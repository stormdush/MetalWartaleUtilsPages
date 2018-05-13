<template>
  <v-flex class="fluid container">
    <v-flex class="form-group form-group-lg panel panel-default">
      <v-flex class="panel-heading">
        <h3 class="panel-title">Sortbale control</h3>
      </v-flex>
      <v-flex class="panel-body">
        <v-flex class = "checkbox">
          <label><input type = "checkbox" v-model="editable">Enable drag and drop</label>      
        </v-flex>
        <button type="button" class="btn btn-default" @click="orderList">Sort by original order</button>
      </v-flex>
    </v-flex>
  <v-layout row wrap>
    <v-flex  class="col-md-3">
        <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false"> 
          <transition-group type="transition" :name="'flip-list'">
            <li class="list-group-item" v-for="element in list" :key="element.order"> 
              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              {{element.name}}
              <span class="badge">{{element.order}}</span>
            </li> 
          </transition-group>
      </draggable>
    </v-flex>
     <v-flex  class="col-md-3">
      <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove"> 
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="element in list2" :key="element.order"> 
              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              {{element.name}}
              <span class="badge">{{element.order}}</span>
            </li> 
          </transition-group>
      </draggable>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex  class="list-group col-md-3">
      <pre>{{listString}}</pre>
    </v-flex>
     <v-flex  class="list-group col-md-3">
      <pre>{{list2String}}</pre>
    </v-flex>
  </v-layout>
  </v-flex>
</template>

<script>
import draggable from 'vuedraggable'
const message = [ 'vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based' , 'on', 'Sortablejs' ]

export default {
  name: 'hello',
  components: {
    draggable,
  },
  data () {
    return {
      list: message.map( (name,index) => {return {name, order: index+1, fixed: false}; }),
      list2:[],
      editable:true,
      isDragging: false,
      delayedDragging:false
    }
  },
  methods:{
    orderList () {
      this.list = this.list.sort((one,two) =>{return one.order-two.order; })
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    }
  },
  computed: {
    dragOptions () {
      return  {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      };
    },
    listString(){
      return JSON.stringify(this.list, null, 2);  
    },
    list2String(){
      return JSON.stringify(this.list2, null, 2);  
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue){
        this.delayedDragging= true
        return
      }
      this.$nextTick( () =>{
           this.delayedDragging =false
      })
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i{
  cursor: pointer;
}
</style>

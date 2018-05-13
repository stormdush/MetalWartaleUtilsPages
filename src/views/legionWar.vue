<template>
  <v-container grid-list-xs align-start>
    <v-layout row wrap>
      <v-flex xs10 offset-xs-1>
        <draggable class="list-group" element="v-flex" v-model="pointList" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
          <v-flex class="list-group-item" v-for="element in pointList" :key="element.order">
            <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click="element.fixed=! element.fixed" aria-hidden="true"></i>
            {{element.name}}
          </v-flex>
        </draggable>
      </v-flex>
    </v-layout>
    <v-flex style="margin-left:10px" xs10 offset-xs-1 class="form-group form-group-lg panel panel-default">
      <v-flex class="panel-body">
        <v-flex class = "checkbox">
          <label><input type = "checkbox" v-model="editable">Lock on</label>      
        </v-flex>
      </v-flex>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs9>
        <draggable element="span" v-model="battleFieldList" :options="dragOptions" :move="onMove">
            <transition-group name="no" class="list-group" tag="ul">
              <v-flex style="margin-top:10px" v-for="element in battleFieldList" :key="element.order">
                <v-layout row wrap>
                  <v-flex align-center class="list-war-item">{{element.name}}</v-flex>
                  <v-flex xs2 class="list-war-item">1
                    <v-flex class="">
                      123
                    </v-flex>
                  </v-flex>
                  <v-flex xs2 class="list-war-item">2</v-flex>
                  <v-flex xs2 class="list-war-item">3</v-flex>
                  <v-flex xs2 class="list-war-item">4</v-flex>
                  <v-flex xs2 class="list-war-item">5</v-flex>
                </v-layout>
              </v-flex>
            </transition-group>
        </draggable>
      </v-flex>
      <v-flex xs3>
        aaaaaa
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable';
import Gun from 'gun';

const points = [
  '机皇座',
  '昆仑本部',
  '储酒泉',
  '幻海',
  '云峰',
  '第一开发部',
  '第二开发部',
  '第三开发部'
];

export default {
  name: 'hello',
  components: {
    draggable
  },
  data() {
    return {
      pointList: points.map((name, index) => {
        return { name, order: index + 1, fixed: false };
      }),
      battleFieldList: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    orderList() {
      this.pointList = this.pointList.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      };
    },
    pointListString() {
      return JSON.stringify(this.pointList, null, 2);
    },
    battleFieldListString() {
      return JSON.stringify(this.battleFieldList, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
  float: left;
  margin-left: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: aliceblue;
}

.list-group-item i {
  cursor: pointer;
}

.list-war-item {
  cursor: move;
  float: left;
  margin-left: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: aliceblue;
}
</style>

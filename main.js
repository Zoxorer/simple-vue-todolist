
function success(text){
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "center",
    style: {
      background: "#5bb456",
    }
  }).showToast();
}
function fail(text){
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "center",
    style: {
      background: "red"
    }
  }).showToast();
}
function info(text){
  Toastify({
    text: text,
    duration: 2000,
    close: true,
    gravity: "bottom",
    position: "center",
    style: {
      background: "gray"
    }
  }).showToast();
}


const main = {
  data(){
    return {
      stateName: "Add",
      data: null,
      editOn: null,
      tasks: []
    }
  },
  mounted(){
    var localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
    if(localStorageTasks.length){
      this.tasks = localStorageTasks;
      success("Successfully loading from saved data");
    }
  },
  methods: {
    saveToLocalStorage(){
      localStorage.setItem("tasks", JSON.stringify(this.tasks));

    },
    addTask(){
      if(!this.data){
        info("Don't leave this Empty")
        return 0;
      }
      if(this.editOn != null){
        this.tasks[this.editOn].data = this.data
        this.editOn = null;
        this.data = null;
        this.stateName = "Add"
        success("Changes Saved");
        this.saveToLocalStorage();
        return 1;
      }
      this.tasks.push({data:this.data, done: false});
      this.data = null;
      this.saveToLocalStorage();
    },
    deleteTask(taskIndex){
      if(this.editOn != null){
        fail(`Unable to delete, Currently you're in editing mode for column ${this.editOn}`);
        return 0;
      }
      this.tasks.splice(taskIndex,1);
      success("Successfully Deleted");
      this.saveToLocalStorage();
    },
    editTask(taskIndex){
      if(this.editOn != null){
        fail(`Unable to edit, Currently you're in editing mode for column ${this.editOn}`);
        return 0;
      }
      this.data = this.tasks[taskIndex].data;
      this.editOn = taskIndex;
      this.stateName = `Save Changes for column ${this.editOn}`
      this.saveToLocalStorage();
    },
    updateDone(taskIndex){
      this.tasks[taskIndex].done = !this.tasks[taskIndex].done;
    },
    cancelEditTask(){
      this.editOn = null;
      this.data = null;
      this.stateName = "Add";
      info("Edit Canceled");
    }
  }
}
const vueApp = Vue.createApp(main);
vueApp.mount("#main");
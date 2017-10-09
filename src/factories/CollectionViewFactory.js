import Backbone from 'backbone';
import $ from 'jquery';

import listener from '../listener';
import showDialog from '../handlers/showDialog';
import deleteModel from '../handlers/deleteModel';
import saveModel from '../handlers/saveModel';
import { MODEL_CHANGED, MODEL_TRASHED, MODEL_CREATED } from '../events';

export default (element, Collection, ModelView, getInput) => {
  const modal = `div#${element}.modal`;

  // fixme: this doesn't work!
  $(modal).on('show.bs.modal', showDialog);
  $(`${modal} button.btn-delete`).on('click', deleteModel(Collection, element));
  $(`${modal} button.btn-save`).on('click', saveModel(Collection, element, getInput));

  return class CollectionView extends Backbone.View {
    constructor(options) {
      super({
        ...options,
        el: `#${element}_list tbody`,
      });

      this.collection = Collection;

      this.listeners();
      this.render();
    }

    render() {
      if (this.collection.length) {
        $(`#no_${element}s`).hide();
        $(`#${element}_list`).show();
      } else {
        $(`#no_${element}s`).show();
        $(`#${element}_list`).hide();
      }
    }

    listeners() {
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'remove', this.addAll);
      this.listenTo(this.collection, 'all', this.render);

      listener.on(`${element}:${MODEL_CHANGED}`, (data) => {
        const model = this.collection.get(parseInt(data.model.id, 10));

        if (model) {
          model.set(data.model);
        }
      });

      listener.on(`${element}:${MODEL_TRASHED}`, (data) => {
        const model = this.collection.get(parseInt(data.model.id, 10));

        if (model) {
          this.collection.remove(model);
        }
      });

      listener.on(`${element}:${MODEL_CREATED}`, (data) => {
        console.error(`${element}:${MODEL_CREATED} not handled yet`, data);
        // FIXME: Figure out how to get the project_id
        // if (parseInt(data.model.project_id, 10) === parseInt(app.project_id, 10)) {
        //   this.collection.add(data.model);
        // }

        // var target_type = $('input[name="target_type"]').val();
        // var target_id = $('input[name="target_id"]').val();
        // if (target_type == data.model.target_type && parseInt(data.model.target_id) === parseInt(target_id)) {
        //   app.ConfigFiles.add(data.model);
        // }
      });

      // FIXME: Figure out why if we do this collections is null in the method
      // listener.on(`${element}:${MODEL_CHANGED}`, this.modelChanged);
      // listener.on(`${element}:${MODEL_TRASHED}`, this.modelTrashed);
      // listener.on(`${element}:${MODEL_CREATED}`, this.modelCreated);
    }

    addOne(model) {
      const view = new ModelView({
        model,
      });

      this.$el.append(view.render().el);
    }

    addAll() {
      this.$el.html('');

      this.collection.each(this.addOne, this);
    }
  };
};
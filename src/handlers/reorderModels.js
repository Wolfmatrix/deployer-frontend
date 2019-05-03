import $ from 'jquery';
import 'jquery-sortable';

export default (element, endpoint, suffix) => {
  const selector = suffix !== undefined ? `${element}s-${suffix}_list` : `${element}_list`;
  $(`#${selector} table`).sortable({
    containerSelector: 'table',
    itemPath: '> tbody',
    itemSelector: 'tr',
    placeholder: '<tr class="placeholder"/>',
    delay: 500,
    onDrop: (item, container, _super) => {
      _super(item, container);

      const data = {};
      data[`${element}s`] = [];
      $('tbody tr td:first-child', container.el[0]).each((idx, row) => {
        data[`${element}s`].push($(row).data(`${element}-id`));
      });

      $.ajax({
        url: endpoint,
        method: 'POST',
        data,
      });
    },
  });
};

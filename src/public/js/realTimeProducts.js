
const socket = io();

$( document ).ready(() => {
  $('#create-form').on('submit', (event) => {
    event.preventDefault();
    const inputs = $('#create-form :input');
    const data = {};
    inputs.each((index, input) => {
      if(input.name){
        data[input.name] = $(input).val();
      }
    });
    data['status'] = true
    data['thumbnail'] = [];
    socket.emit('createProduct', data);
    $('#addProductModal').modal('hide');
  })
})

socket.on('createdProduct', data=>{
  $('#table-container').append(`
    <tr>
      <td class="col-3">${data.title}</td>
      <td class="col-3">${data.description}</td>
      <td class="col-2">${data.category}</td>
      <td class="col-1">${data.code}</td>
      <td class="col-1">${data.price}</td>
      <td class="col-1">${data.stock}</td>
      <td class="col-1">
        <a onclick="deleteProduct('${data.id}')" class="delete"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
      </td>
  </tr>`)
})

socket.on('deletedProduct', data=>{
  $(`#product-row-${data.id}`).remove();
})

function deleteProduct(id) {
  socket.emit('deleteProduct', id);
}
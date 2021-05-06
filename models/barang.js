const dbase = require("./connection");

async function select(){
    let conn = await dbase.getConnection();
    let query = "select * from barang";
    let hasil = await dbase.executeQuery(query, conn);
    conn.release();
    return hasil;
}

async function selectId(id){
    let conn = await dbase.getConnection();
    let query = `select * from barang where barang_id='${id}'`;
    let hasil = await dbase.executeQuery(query, conn);
    conn.release();
    return hasil;
}

async function insert(data){
    try {
        let conn = await dbase.getConnection();
        let query = `insert into barang (barang_id, barang_nama, barang_stok, barang_harga, barang_status) values ('${data.id}', '${data.nama}', ${data.stok}, ${data.harga}, 'A')`;
        let hasil = await dbase.executeQuery(query, conn);
        conn.release();
        return data;
    } catch (error) {
        return "";
    }        
}

async function update(data){
    try {
        let conn = await dbase.getConnection();
        let query = `update barang set barang_nama='${data.nama}', barang_stok=${data.stok}, barang_harga=${data.harga} where barang_id='${data.id}'`;
        let hasil = await dbase.executeQuery(query, conn);
        conn.release();
               
        return data;
                
    } catch (error) {
        return error;
    }     
}

module.exports = {
    "get": select,
    "add": insert,
    "getId": selectId,
    "put": update
}
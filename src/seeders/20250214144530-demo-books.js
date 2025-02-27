'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('Books',
        [ 
          { name: 'Harry Potter và Hòn Đá Phù Thủy', description: 'Cuốn sách đầu tiên trong loạt Harry Potter.', originalCost: 150000, sale: 135000, stock: 50, publisherId: 3, authorId: 2, publishedDate: '1997-06-26', state: 'new', seriesId: 1, bookImageUrl: "https://th.bing.com/th/id/OIP.RCI8HHXdFoNv3Y678zC1RQAAAA?rs=1&pid=ImgDetMain"},
          { name: 'Harry Potter và căn phòng bí mật', description: 'Cuốn sách đầu tiên trong loạt Harry Potter.', originalCost: 150000, sale: 135000, stock: 50, publisherId: 3, authorId: 2, publishedDate: '1997-06-26', state: 'new', seriesId: 1, bookImageUrl: "https://cf.shopee.vn/file/6e34fd8855fe2d9f50efd74da19d3c9f"},
          { name: 'Harry Potter và tù nhân Azkaban', description: 'Cuốn sách đầu tiên trong loạt Harry Potter.', originalCost: 150000, sale: 135000, stock: 50, publisherId: 3, authorId: 2, publishedDate: '1997-06-26', state: 'new', seriesId: 1, bookImageUrl: "https://th.bing.com/th/id/OIP.K3J8w0ZLj-_LZ553beKJpgAAAA?rs=1&pid=ImgDetMain"},
          { name: 'Harry Potter và chiếc cốc lửa', description: 'Cuốn sách đầu tiên trong loạt Harry Potter.', originalCost: 150000, sale: 135000, stock: 50, publisherId: 3, authorId: 2, publishedDate: '1997-06-26', state: 'new', seriesId: 1, bookImageUrl: "https://salt.tikicdn.com/cache/w1200/media/catalog/product/n/x/nxbtre_full_20342017_033410.u4972.d20170426.t163428.208230.jpg"},
          { name: 'Conan Tập 1', description: 'Tập đầu tiên của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 100, publisherId: 4, authorId: 4, publishedDate: '1994-01-01', state: 'new', seriesId: 3 , bookImageUrl: "https://th.bing.com/th/id/OIP.T4-H6gEh0c8wjeVFNLApMgAAAA?rs=1&pid=ImgDetMain"},
          { name: 'Conan Tập 2', description: 'Tập thứ hai của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 90, publisherId: 4, authorId: 4, publishedDate: '1994-06-01', state: 'new', seriesId: 3 , bookImageUrl: "https://th.bing.com/th/id/OIP.1BeLBgW-H49xq3fysI45RAHaLi?rs=1&pid=ImgDetMain"},
          { name: 'Conan Tập 3', description: 'Tập thứ ba của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 100, publisherId: 4, authorId: 4, publishedDate: '1994-01-01', state: 'new', seriesId: 3 , bookImageUrl: "https://th.bing.com/th/id/R.5171e4d91a27b259044f0331dc18f52e?rik=ZX91JHQtTTIy7w&pid=ImgRaw&r=0"},
          { name: 'Conan Tập 4', description: 'Tập thứ tư của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 90, publisherId: 4, authorId: 4, publishedDate: '1994-06-01', state: 'new', seriesId: 3 , bookImageUrl: "https://th.bing.com/th/id/R.c572ee2ef24b3395aefa7aab9acb3946?rik=M9Srag7avdau0Q&pid=ImgRaw&r=0"},
          { name: 'Conan Tập 5', description: 'Tập thứ năm của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 100, publisherId: 4, authorId: 4, publishedDate: '1994-01-01', state: 'new', seriesId: 3 , bookImageUrl: "https://th.bing.com/th/id/R.a88c258a1a35fc2f347cdbd660a38524?rik=RSy696519Oz3Cw&riu=http%3a%2f%2ffile.kenhsinhvien.vn%2f2015%2f08%2f22%2fconan928-00.jpg&ehk=EHwDQn8ZQw4VK8DHGsb8Vu79R39zdnkFlOCAvehmJvI%3d&risl=&pid=ImgRaw&r=0"},
          { name: 'Conan Tập 6', description: 'Tập thứ sáu của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 90, publisherId: 4, authorId: 4, publishedDate: '1994-06-01', state: 'new', seriesId: 3 , bookImageUrl: "https://cf.shopee.vn/file/8412f40a772af434c4e837976ecb52dd"},
          { name: 'Conan Tập 7', description: 'Tập thứ bảy của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 100, publisherId: 4, authorId: 4, publishedDate: '1994-01-01', state: 'new', seriesId: 3 , bookImageUrl: "https://cf.shopee.vn/file/8412f40a772af434c4e837976ecb52dd"},
          { name: 'Conan Tập 8', description: 'Tập thứ tám của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 90, publisherId: 4, authorId: 4, publishedDate: '1994-06-01', state: 'new', seriesId: 3 , bookImageUrl: "https://th.bing.com/th/id/OIP.H3_3OhY-V1s1f-zGSYPYHQHaLi?rs=1&pid=ImgDetMain"},
          { name: 'Conan Tập 9', description: 'Tập thứ chín của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 100, publisherId: 4, authorId: 4, publishedDate: '1994-01-01', state: 'new', seriesId: 3 , bookImageUrl: "https://th.bing.com/th/id/R.c3fcad71f1a61402fa73804ea08ff4d8?rik=VSubI168uSyfSw&pid=ImgRaw&r=0"},
          { name: 'Conan Tập 10', description: 'Tập thứ mười của bộ truyện Conan.', originalCost: 45000, sale: 40000, stock: 90, publisherId: 4, authorId: 4, publishedDate: '1994-06-01', state: 'new', seriesId: 3 , bookImageUrl: "https://th.bing.com/th/id/R.c3fcad71f1a61402fa73804ea08ff4d8?rik=VSubI168uSyfSw&pid=ImgRaw&r=0"},
          { name: 'Mắt Biếc', description: 'Một tác phẩm nổi tiếng của Nguyễn Nhật Ánh.', originalCost: 120000, sale: 110000, stock: 40, publisherId: 1, authorId: 1, publishedDate: '1990-01-01', state: 'new', seriesId: null , bookImageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691147319i/11273677.jpg"},
          { name: 'Rừng Na Uy', description: 'Tiểu thuyết nổi tiếng của Haruki Murakami.', originalCost: 180000, sale: 160000, stock: 30, publisherId: 2, authorId: 3, publishedDate: '1987-01-01', state: 'new', seriesId: null , bookImageUrl: "https://th.bing.com/th/id/R.a5e10d9f51b8fc54a3ffa076a602af1e?rik=%2fSJGUqSjapXDag&riu=http%3a%2f%2ftapchisonghuong.com.vn%2fuploads%2fnews%2fsize500%2fnews3%2f1%2f090428rung-Nauyto2.jpg&ehk=vk6qUfO9uoUUqBjtvOFDexE7JAusA54FXD19SAGp9lQ%3d&risl=&pid=ImgRaw&r=0"}  
        ]
      , {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

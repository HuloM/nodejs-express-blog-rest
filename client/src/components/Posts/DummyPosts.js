const posts = [
    {
        id: 'p1',
        title: 'This is the first post',
        imageUrl: 'No image',
        body: 'Body portion',
        createdAt: new Date(2022, 4, 2),
        author: 'Matt',
        comments: [
            {
                id: 'c1',
                comment: 'wow this post is cool',
                author: 'Tester'
            },
            {
                id: 'c2',
                comment: 'nice post',
                author: 'Jack'
            },
            {
                id: 'c3',
                comment: 'very informative',
                author: 'John'
            },
        ]
    },
    {
        id: 'p2',
        title: 'This is the second post',
        imageUrl: 'No image',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur. Eu non diam phasellus vestibulum lorem sed risus. Fusce id velit ut tortor pretium. Libero volutpat sed cras ornare. Euismod quis viverra nibh cras pulvinar. Lacus sed turpis tincidunt id aliquet risus feugiat in. Elit at imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam nulla facilisi cras fermentum odio. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Rhoncus urna neque viverra justo nec ultrices dui. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh. Adipiscing enim eu turpis egestas. Sed faucibus turpis in eu mi. Eu feugiat pretium nibh ipsum consequat. Metus vulputate eu scelerisque felis imperdiet proin fermentum. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Dolor magna eget est lorem ipsum dolor sit amet consectetur.\n' +
            '\n' +
            'Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Purus gravida quis blandit turpis cursus. Viverra orci sagittis eu volutpat odio facilisis. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Eget aliquet nibh praesent tristique magna sit amet purus gravida. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Suspendisse sed nisi lacus sed. Quis eleifend quam adipiscing vitae proin sagittis. Mauris pellentesque pulvinar pellentesque habitant morbi. Feugiat pretium nibh ipsum consequat nisl. Pretium quam vulputate dignissim suspendisse in est ante in nibh. Sed euismod nisi porta lorem mollis aliquam ut. Tristique risus nec feugiat in fermentum. Cras pulvinar mattis nunc sed. Arcu cursus vitae congue mauris rhoncus aenean. Venenatis tellus in metus vulputate eu. Congue nisi vitae suscipit tellus mauris. Placerat duis ultricies lacus sed turpis tincidunt id. Egestas sed sed risus pretium quam vulputate dignissim. oin fermentum. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Purus gravida quis blandit turpis cursus. Viverra orci sagittis eu volutpat odio facilisis. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. ETempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Purus gravida quis blandit turpis cursus. Viverra orci sagittis eu volutpat odio facilisis. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. ETempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Purus gravida quis blandit turpis cursus. Viverra orci sagittis eu volutpat odio facilisis. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. ETempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Purus gravida quis blandit turpis cursus. Viverra orci sagittis eu volutpat odio facilisis. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. E',
        createdAt: new Date(2022, 4, 2),
        author: 'Matt',
        comments: [
            {
            id: 'c1',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur.',
            author: 'Tester'
            },
            {
                id: 'c2',
                comment: 'nice post',
                author: 'Jack'
            }
            ]
    },
    {
        id: 'p3',
        title: 'This is the third post',
        imageUrl: 'No image',
        body: 'Body portion',
        createdAt: new Date(2022, 4, 1),
        author: 'Matt',
        comments: [
            {
                id: 'c1',
                comment: 'wow this post is cool',
                author: 'Tester'
            },
        ]
    },
    {
        id: 'p4',
        title: 'This is the fourth post',
        imageUrl: 'No image',
        body: 'Body portion',
        createdAt: new Date(2022, 3, 29),
        author: 'Matt',
        comments: [
        ]
    },
]

export default posts
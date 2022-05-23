export default {
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96
            }
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot: true
            }
        },
    ],
}

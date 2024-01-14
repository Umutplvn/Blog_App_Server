blogPost Model
comment:{objectId, ref:"commentModel"}

commentModel:{_id:123, name:Omer, createdAt:23.23.04, surname:umut}

blogPost
comment:123

blogPost.populate('comment')
comment:{_id:123, name:Omer, createdAt:23.23.04, surname:umut}

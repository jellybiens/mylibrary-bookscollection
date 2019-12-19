const { GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema } = require( 'graphql' );
const fetch = require( 'node-fetch' );

const BookCover = new GraphQLObjectType( {
  name: 'BookCover',
  description: 'A book and it\'s information',
  fields: () => {
    return {
      key_id: {
        type: GraphQLID,
        resolve( book ) {
          return book.key;
        },
      },
      title: {
        type: GraphQLString,
        resolve( book ) {
          return book.title;
        },
      },
      cover_i: {
        type: GraphQLString,
        resolve( book ) {
          return book.cover_i;
        },
      },
      author_name: {
        type: GraphQLString,
        resolve( book ) {
          return book.author_name !== undefined ? book.author_name[0] : 'Unknown Author';
        },
      },
      first_publish_year: {
        type: GraphQLInt,
        resolve( book ) {
          return book.first_publish_year;
        },
      },
      isbn: {
        type: GraphQLString,
        resolve( book ) {
          return book.isbn !== undefined ? book.isbn[0] : '-';
        },
      },
    };
  },

} );

const Query = new GraphQLObjectType( {
  name: 'Query',
  description: 'Fetch books by search query',
  fields: () => {
    return {
      booksResults: {
        type: new GraphQLList( BookCover ),
        args: {
          queryString: {
            type: GraphQLString,
          },
        },
        resolve: async ( _, { queryString }, req ) => {
          const res = await fetch( `http://openlibrary.org/search.json?title=${queryString}&has_fulltext=true` );
          const json = await res.json();
          return json.docs;
        },
      },
    };
  },
} );


const Schema = new GraphQLSchema( {
  query: Query,
} );

module.exports = Schema;

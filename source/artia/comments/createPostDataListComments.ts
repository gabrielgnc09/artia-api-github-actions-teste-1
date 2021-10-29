export function createPostDataListComments(
  accountId: string,
  idsLine: string,
  viewed: boolean
) {
  var postData = JSON.stringify({
    query: `query {
          listingCommentsNotViewed(
              accountId: ${accountId}, #obrigatório
              ${idsLine} 
              #ids: [1, 2, 3, 10], 
              type: "Activity", #obrigatório
              viewed: ${viewed}
              ) {
              id,
              content,
              createdAt,
              createdByApi,  
              author {
                  id,
                  name,
                  email
              },
              registeredBy {
                  id,
                  name,
                  email
              }
              users {
                  id,
                  name,
                  email
              }
          }
      }`,
    variables: {},
  });
  return postData;
}

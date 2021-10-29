export function createPostDataAddComment(
  accountId: string,
  activityId: string,
  content: string,
  createdBy: string,
  usersLine: string
) {
  const postData = JSON.stringify({
    query: `mutation{
        createComment(
            accountId: ${accountId},
            id: ${activityId}, #obrigatório
            object: "activity", #obrigatório
            content: "${content}", #obrigatório | Quando for string dentro de variável com $ usar tbm os ""
            createdBy: "${createdBy}", #opcional, pode ser id ou email
            ${usersLine}
            
        ) {
            id,
            content,
            createdAt,
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

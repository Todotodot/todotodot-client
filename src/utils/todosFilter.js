/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
const todosFilter = (userInfo, filterInfo) => {
  const { searchValue, filterValue, isGroup, groupId } = filterInfo;

  if (filterValue === "All") {
    return userInfo;
  }

  const isCompleted = filterValue === "Completed" || false;

  if (!groupId && isGroup) {
    const searchFilterGroup = userInfo.groups.filter((item) =>
      item.title.includes(searchValue)
    );
    userInfo.groups = searchFilterGroup;
  } else {
    const searchFilterTodos = userInfo.todos.filter((item) =>
      item.title.includes(searchValue)
    );
    userInfo.todos = searchFilterTodos;
  }

  const filterTodos = userInfo.todos.filter(
    (item) => item.isCompleted === isCompleted
  );

  userInfo.todos = filterTodos;

  return userInfo;
};

export default todosFilter;

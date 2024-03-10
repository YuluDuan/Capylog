const PostsBoard = (props: { createdAt: Date; revised_text: string }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // const month = months[props.createdAt.getMonth()];
  // const day = props.createdAt.getDate();
  return (
    <div className="flex items-start gap-[15px]">
      <div className="flex flex-col gap-2 h-[100px] w-[100px] border border-[#614F3F] bg-[#FFFFFF] rounded-2xl text-center py-5">
        <div>March</div>
        <div>10</div>
      </div>
      <p className="p-5 min-h-[100px] bg-[#f1edeb] w-[700px] rounded-lg">
        {props.revised_text}
      </p>
    </div>
  );
};

export default PostsBoard;

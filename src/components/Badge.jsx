const Badge = ({ children, styleInfo }) => {
    const colorKey = {
      Fashion: "bg-blue-500 text-white",
      Travel: "bg-green-500 text-white",
      Fitness: "bg-red-500 text-white",
      Food: "bg-yellow-500 text-white",
      Tech: "bg-teal-500 text-white",
      Sports: "bg-gray-800 text-white",
    };
  
    return (
      <h5 style={styleInfo} className="inline-block">
        <span className={`px-2 py-1 rounded ${colorKey[children]}`}>
          {children}
        </span>
      </h5>
    );
  };
  
  export default Badge;
  
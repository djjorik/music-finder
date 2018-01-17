// import * as React from "react";
// import SearchBlock from "../SearchBlock/SearchBlock";
// import Tracks from "../Tracks/Tracks";

// const trackWrapper = (props: any) => {
//   let tracks = (
//     <Tracks tracks={props.topTracks} clicked={props.findYoutubeVideo} />
//   );
//   if (
//     props.foundTracks &&
//     props.foundTracks.length > 0 &&
//     props.value.trim() !== "" &&
//     props.loaded
//   ) {
//     tracks = (
//       <Tracks tracks={props.foundTracks} clicked={props.findYoutubeVideo} />
//     );
//   }
//   return (
//     <div>
//       <SearchBlock
//         value={props.value}
//         onChanged={props.onChanged}
//         searched={props.searched}
//       />
//       <div className="tracks">{tracks}</div>
//     </div>
//   );
// };

// export default trackWrapper;

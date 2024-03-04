import { useNavigate } from 'react-router';

import cat1 from "../uploads/cat1.jpg";

const testData = [
    {
      p_id : "1",
      p_name : "cat1",
      p_date : "240101",
      p_thumbnail : cat1,
    },
  ];

function ProjectDetail() {
    const navigate = useNavigate();

    return(
        <form>
            {testData ? (
              testData.map(project => (
                <div>
                  <img src={project.p_thumbnail} style={{"width" : "200px", "height" : "200px"}}/>
                </div>  
              ))
            ) : (
              <p>Loading Image...</p>
            )}
            <input placeholder="Write your Project Name"/>
            <input placeholder="Describe your Project"/>
            <button onClick={ () => navigate("/convert") }>Voice Generate</button>
            <button onClick={ () => navigate("/main") }>Back to Upload Page</button>
        </form>
    );
}

export default ProjectDetail;
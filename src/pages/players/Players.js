import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../components/Menu";
import { Link } from "react-router-dom";
import axios from "axios";

const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    displayPlayers();
  }, []);

  const displayPlayers = async () => {
    await axios.get("http://127.0.0.1:8000/api/players").then((res) => {
      setPlayers(res.data);
    });
  };

  const deletePlayer = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/players/${id}`)
      .then(displayPlayers);
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Taille</th>
              <th>Position</th>
              <th>Club</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.height}</td>
                <td>{player.position}</td>
                <td>{player.club_id}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/uploads/${player.photoPlayer}`}
                    width="75px"
                    alt={`${player.firstName} ${player.lastName}`}
                  />
                </td>
                <td>
                  <Link
                    to={`/players/edit/${player.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deletePlayer(player.id);
                    }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Players;

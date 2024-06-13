
  module.exports = {
    ingredientsMiddleware: async (req, res, next) => {
        // Middleware logic
        const {
            title,
            id
          } = req.query;

        if(!title) return next();
          const pool = await fetch(`http://localhost:3001/local/insert-history`, {
            method: `POST`,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: title,
              id: id,
            })
        });
        if (!pool.ok) {
        
            const errorText = await pool.text();
            console.log(errorText);
            return;
        }
        next();
    }
  };
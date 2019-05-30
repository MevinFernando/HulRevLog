module.exports = () => {
  const today = new Date();
  return `
    <html>
    <a href="http://localhost:5000/api/distributors/return/123456/status/60">Accept</a>
    <a href="http://localhost:5000/api/distributors/return/123456/status/61">Reject</a>
    </html>`;
};

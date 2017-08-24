const PROTOCOL = "omega:";

const parseProtocol = uri => {
  if (!uri.startsWith(PROTOCOL)) {
    return null;
  }
  const pathname = uri.slice(PROTOCOL.length);
  const [type, id] = pathname.split("/", 2).map(decodeURIComponent);
  return { type, id };
};

export default parseProtocol;

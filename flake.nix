{
  description = "Laravel quiz app dev env";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            php83
            php83Packages.composer
            nodejs_20
            sqlite
            git
            curl
            which
          ];

          shellHook = ''
            echo "PHP version: $(php --version | head -n1)"
            echo "Composer version: $(composer --version | head -n1)"
            echo "Node version: $(node --version)"
            echo "npm version: $(npm --version)"
          '';
        };
      }
    );
}

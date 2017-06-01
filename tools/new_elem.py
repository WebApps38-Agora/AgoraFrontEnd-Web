#!/usr/local/bin/python3
import sys

name = sys.argv[1]
print()
if (name):
    with open("../src/{}.html".format(name), "w") as f:

        s = ("""<link rel="import" href="../bower_components/polymer/polymer-element.html">
<link rel="import" href="shared-styles.html">
<link rel="import" href="my-icons.html">

<dom-module id="{0}">
  <template>
    <style inclue="shared-styles">
        :host {{
            display: block;
        }}
    </style>

  </template>

  <script>
    class {1} extends Polymer.Element {{
      static get is() {{ return '{0}'; }}
    }}

    window.customElements.define({1}.is, {1});
  </script>
</dom-module>
""")

        f.write(s.format(name, "".join([x.capitalize() for x in name.split('-')])))

# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.define "proxy" do |proxy|
    proxy.vm.box = "ubuntu/trusty64"
    proxy.vm.hostname = "proxy.box"

    #proxy.vm.network :forwarded_port, guest: 8080, host: 8080

    proxy.vm.network :private_network, ip: "192.168.32.3"

    proxy.vm.provider :virtualbox do |vb|
      vb.customize [
        "modifyvm", :id,
        "--cpuexecutioncap", "50",
        "--memory", "256",
      ]
      # Display the VirtualBox GUI when booting the machine
      vb.gui = false
 
      # Customize the amount of memory on the VM:
      vb.memory = "1024"
    end

    proxy.vm.provision "shell", inline: <<-SHELL

       echo 1 > /proc/sys/net/ipv4/ip_forward

       apt-get update


       apt-get install -y apache2
       apt-get install apache2-utils


       if ! [ -L /var/www ]; then
          rm -rf /var/www
          ln -fs /vagrant/www /var/www
       fi

#       cp /vagrant/001-reverse-proxy.conf /etc/apache2/sites-available/
#       a2ensite 001-reverse-proxy.conf
       cp /vagrant/002-forward-proxy.conf /etc/apache2/sites-available/
       a2ensite 002-forward-proxy.conf
       a2enmod proxy
       a2enmod proxy_http
       a2enmod proxy_connect
       a2enmod authz_host
#      a2enmod disk_cache

       htpasswd -b -c /etc/apache2/passwords foo bar
       service apache2 restart

	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	sudo apt-get install -y nodejs
        npm install npm@latest -g
        npm install -g typescript

    SHELL
  end

  config.vm.define "server1" do |server1|
    server1.vm.box = "ubuntu/trusty64"
    server1.vm.hostname = "server1.box"

    #server1.vm.network :forwarded_port, guest: 8080, host: 8080

    server1.vm.network :private_network, ip: "192.168.32.4"

    server1.vm.provider :virtualbox do |vb|
      vb.customize [
        "modifyvm", :id,
        "--cpuexecutioncap", "50",
        "--memory", "256",
      ]
      # Display the VirtualBox GUI when booting the machine
      vb.gui = false

      # Customize the amount of memory on the VM:
      vb.memory = "1024"
    end

   server1.vm.provision "shell", inline: <<-SHELL

      route add default gw 192.168.32.3 eth1
      route del default gw 10.0.2.2
   
   SHELL

  end

end
